package com.zucchini.domain.user.service;

import com.zucchini.domain.category.domain.ItemCategory;
import com.zucchini.domain.image.service.ImageService;
import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.item.dto.response.FindItemListResponse;
import com.zucchini.domain.item.repository.ItemRepository;
import com.zucchini.domain.user.domain.User;
import com.zucchini.domain.user.domain.UserItemLike;
import com.zucchini.domain.user.domain.UserItemLikeId;
import com.zucchini.domain.user.dto.request.*;
import com.zucchini.domain.user.dto.response.FindUserResponse;
import com.zucchini.domain.user.dto.response.UserDealHistoryResponse;
import com.zucchini.domain.user.repository.UserItemLikeRepository;
import com.zucchini.domain.user.repository.UserRepository;
import com.zucchini.global.config.cache.CacheKey;
import com.zucchini.global.config.jwt.JwtExpirationEnums;
import com.zucchini.global.config.security.CustomUserDetails;
import com.zucchini.global.domain.*;
import com.zucchini.global.exception.UserException;
import com.zucchini.global.util.JwtTokenUtil;
import com.zucchini.global.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService {

    private final ImageService imageService;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final LogoutAccessTokenRedisRepository logoutAccessTokenRedisRepository;
    private final UserItemLikeRepository userItemLikeRepository;
    private final ItemRepository itemRepository;
    private final JwtTokenUtil jwtTokenUtil;

    private final JavaMailSender javaMailSender;
    private final RedisUtil redisUtil;

    @Override
    @Transactional(readOnly = true)
    public FindUserResponse findUser(String id) {
        int dealCount = (int) userRepository.countItemsByStatusAndUserNo(id);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails nowLogInDetail = (CustomUserDetails) auth.getPrincipal();
        String authority = nowLogInDetail.getAuthority();

        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("회원이 없습니다."));
        if (!user.getId().equals(getCurrentId()) && !authority.equals("ADMIN")) {
            return FindUserResponse.builder()
                    .nickname(user.getNickname())
                    .reportCount(user.getReportCount())
                    .grade(user.getGrade())
                    .dealCount(dealCount)
                    .build();
        }

        return FindUserResponse.builder()
                .id(user.getId())
                .nickname(user.getNickname())
                .name(user.getName())
                .phone(user.getPhone())
                .gender(user.getGender())
                .email(user.getEmail())
                .reportCount(user.getReportCount())
                .grade(user.getGrade())
                .dealCount(dealCount)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<FindUserResponse> findUserList() {

        List<User> userList = userRepository.findAllByIsDeletedFalseAndAuthorityFalse();

        return userList.stream().map(
                user -> FindUserResponse.builder()
                        .id(user.getId())
                        .nickname(user.getNickname())
                        .name(user.getName())
                        .phone(user.getPhone())
                        .gender(user.getGender())
                        .email(user.getEmail())
                        .reportCount(user.getReportCount())
                        .grade(user.getGrade())
                        .isLocked(user.getIsLocked())
                        .build()
        ).collect(Collectors.toList());
    }

    private String getCurrentId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return principal.getUsername();
    }

    @Override
    public void addUser(AddUserRequest user) {
        if (userRepository.findById(user.getId()).isPresent())
            throw new IllegalArgumentException("이미 등록된 아이디 입니다.");

        if (!authCheck(new EmailCheckRequest(user.getEmail(), user.getAuthKey())))
            throw new UserException("이메일 인증을 다시 해주세요.");

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user.toEntity());
    }

    @Override
    public boolean idCheck(String id) {
        return !userRepository.findById(id).isPresent();
    }

    @Override
    public void authEmail(EmailRequest request) {
        // 임의의 authKey 생성
        Random random = new Random();
        String authKey = String.valueOf(random.nextInt(888888) + 111111);

        // 이메일 발송
        sendAuthEmail(request.getEmail(), authKey);
    }

    private void sendAuthEmail(String email, String authKey) {
        String subject = "애호박마켓 회원가입 인증번호";
        String text = "회원 가입을 위한 인증번호는 " + authKey + "입니다. <br/>";

        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");
            helper.setTo(email);
            helper.setSubject(subject);
            helper.setText(text, true); // HTML이라는 의미로 true.
            javaMailSender.send(mimeMessage);

        } catch (MessagingException e) {
            e.printStackTrace();
        }

        // 유효 시간(5분)동안 {email, authKey} 저장
        redisUtil.setDataExpire(email, authKey, 60 * 5L);
    }

    @Override
    public boolean authCheck(EmailCheckRequest request) {
        return redisUtil.getData(request.getEmail()).equals(request.getAuthKey());
    }

    /**
     * 회원 정보 수정
     */
    @Override
    public void modifyUser(String id, ModifyUserRequest modifyUserRequest) {
        // 기본키로 회원 조회
        Optional<User> user = userRepository.findById(id);
        if(!user.isPresent())
            throw new NoSuchElementException("해당 회원이 존재하지 않습니다.");
        String loginId = getCurrentId();
        User loginUser = user.get();
        if(!loginId.equals(id))
            throw new UserException("잘못된 접근입니다. 로그인한 아이디의 회원 정보만 수정할 수 있습니다.");
        loginUser.modifyUser(modifyUserRequest);
    }

    /**
     * 비밀번호 변경
     */
    @Override
    public void modifyPassword(String password) {
        String loginId = getCurrentId();
        Optional<User> user = userRepository.findById(loginId);
        if(!user.isPresent())
            throw new NoSuchElementException("해당 회원이 존재하지 않습니다.");
        user.get().modifyPassword(passwordEncoder.encode(password));
    }

    @Override
    public void removeUser(String token, String id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null) {
            throw new UserException("로그인이 필요합니다.");
        }

        CustomUserDetails nowLogInDetail = (CustomUserDetails) auth.getPrincipal();
        String currentPrincipalId = nowLogInDetail.getId();
        User user;

        if (id == null) {
            user = userRepository.findById(currentPrincipalId).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
            logout(token, currentPrincipalId);
        } else {
            user = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        }

        user.userDelete();
        userRepository.save(user);
    }

    @Override
    public TokenDto login(LoginRequest loginRequest) {
        User user = userRepository.findById(loginRequest.getId()).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        checkPassword(loginRequest.getPassword(), user.getPassword());

        String id = user.getId();
        String accessToken = jwtTokenUtil.generateAccessToken(id);
        RefreshToken refreshToken = saveRefreshToken(id);
        return TokenDto.of(accessToken, refreshToken.getRefreshToken());
    }

    private RefreshToken saveRefreshToken(String id) {
        return refreshTokenRedisRepository.save(RefreshToken.createRefreshToken(id,
                jwtTokenUtil.generateRefreshToken(id), JwtExpirationEnums.REFRESH_TOKEN_EXPIRATION_TIME.getValue()));
    }

    private void checkPassword(String rawPassword, String findMemberPassword) {
        if (!passwordEncoder.matches(rawPassword, findMemberPassword)) {
            throw new IllegalArgumentException("비밀번호가 맞지 않습니다.");
        }
    }

    @Override
    @CacheEvict(value = CacheKey.USER, key = "#id")
    public void logout(String accessToken, String id) {
        long remainMilliSeconds = jwtTokenUtil.getRemainMilliSeconds((accessToken));
        refreshTokenRedisRepository.deleteById(id);
        logoutAccessTokenRedisRepository.save(LogoutAccessToken.of(accessToken, id, remainMilliSeconds));
    }

    private String resolveToken(String token) {
        return token.substring(7);
    }

    @Override
    public TokenDto reissue(String refreshToken) {
        refreshToken = resolveToken(refreshToken);
        String username = getCurrentUsername(refreshToken);
        RefreshToken redisRefreshToken = refreshTokenRedisRepository.findById(username).orElseThrow(NoSuchElementException::new);

        if (refreshToken.equals(redisRefreshToken.getRefreshToken())) {
            return reissueRefreshToken(refreshToken, username);
        }
        throw new IllegalArgumentException("토큰이 일치하지 않습니다.");
    }

    private String getCurrentUsername(String token) {
        return jwtTokenUtil.extractAllClaims(token).get("id", String.class);
    }

    private TokenDto reissueRefreshToken(String refreshToken, String username) {
        if (lessThanReissueExpirationTimesLeft(refreshToken)) {
            String accessToken = jwtTokenUtil.generateAccessToken(username);
            return TokenDto.of(accessToken, saveRefreshToken(username).getRefreshToken());
        }
        return TokenDto.of(jwtTokenUtil.generateAccessToken(username), refreshToken);
    }

    private boolean lessThanReissueExpirationTimesLeft(String refreshToken) {
        return jwtTokenUtil.getRemainMilliSeconds(refreshToken) < JwtExpirationEnums.REISSUE_EXPIRATION_TIME.getValue();
    }

    @Override
    public void addUserLikeItem(int itemNo) {
        String id = getCurrentId();
        Optional<User> user = userRepository.findById(id);
        if(!user.isPresent()) throw new NoSuchElementException("해당하는 회원이 존재하지 않습니다.");
        int userNo = user.get().getNo();
        UserItemLikeId userItemLikeId = new UserItemLikeId(userNo, itemNo);
        UserItemLike userItemLike = UserItemLike.builder()
                .id(userItemLikeId)
                .build();
        userItemLikeRepository.save(userItemLike);
    }

    @Override
    public List<FindItemListResponse> findUserLikeItemList(String keyword) {
        String id = getCurrentId();
        List<Item> userItemLikeList = userItemLikeRepository.findAllByUserId(id, keyword);
        return userItemLikeList.stream()
                .map(userItemLike -> FindItemListResponse.builder()
                        .no(userItemLike.getNo())
                        .title(userItemLike.getTitle())
                        .updatedAt(userItemLike.getUpdatedAt())
                        .content(userItemLike.getContent())
                        .price(userItemLike.getPrice())
                        .status(userItemLike.getStatus())
                        // 나중에 구현해야 함!!
                        .image(getItemImage(userItemLike.getNo()))
                        .likeCount(userItemLikeRepository.countById_ItemNo(userItemLike.getNo()))
                        .categoryList(getCategory(userItemLike.getCategoryList()))
                        .build())
                .collect(Collectors.toList());
    }

    private String getItemImage(int itemNo) {
        List<String> imageList = imageService.findImageLinkList(itemNo);
        if (imageList.isEmpty())
            return null;
        return imageList.get(0);
    }

    private List<String> getCategory(List<ItemCategory> itemCategoryList) {
        List<String> categoryList = new ArrayList<>();
        for (ItemCategory itemCategory : itemCategoryList) {
            categoryList.add(itemCategory.getCategory().getCategory());
        }
        return categoryList;
    }

    @Override
    public void removeUserLikeItem(int itemNo) {
        String id = getCurrentId();
        userItemLikeRepository.deleteByUserIdAndItemNo(id, itemNo);
    }

    /**
     * 회원의 거래내역, 구매내역인지 판매내역인지 판별하고, 거래 상태를 조회함
     * 아이템 테이블에서 buyer, seller 보면서 나랑 겹치는거 있는지 확인 (내가 buyer인지 seller인지)
     * 그리고 status 보면서 거래상태 값 리턴해주면 됨
     * flag 넘어오는거 false면 판매내역, true면 구매내역으로 구현
     */
    @Override
    public List<UserDealHistoryResponse> findUserDealHistoryList(String keyword, boolean flag) {
        // 로그인 정보 얻어옴
        String id = getCurrentId();
        List<Item> itemList;

        User user = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));

        // item 모든 테이블 확인하면서 flag에 따라 seller 혹은 buyer가 현재 id랑 동일한 것을 찾음
        if (flag) {
            itemList = itemRepository.findAllByBuyer(user, keyword);
        } else {
            itemList = itemRepository.findAllBySeller(user, keyword);
        }

        List<UserDealHistoryResponse> userDealHistoryResponseList = new ArrayList<>();

        for (Item item : itemList) {
            String thumbnailLink = null;

            if (!item.getImageList().isEmpty()) {
                thumbnailLink = item.getImageList().get(0).getLink();
            }

            UserDealHistoryResponse userDealHistoryResponse = UserDealHistoryResponse.builder().title(item.getTitle())
                    .price(item.getPrice()).status(item.getStatus()).thumbnailLink(thumbnailLink).name(item.getSeller().getNickname()).build();
            userDealHistoryResponseList.add(userDealHistoryResponse);
        }

        return userDealHistoryResponseList;
    }


}
