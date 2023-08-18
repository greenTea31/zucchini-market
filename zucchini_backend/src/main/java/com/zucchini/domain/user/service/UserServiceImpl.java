package com.zucchini.domain.user.service;

import com.zucchini.domain.category.domain.ItemCategory;
import com.zucchini.domain.grade.service.GradeService;
import com.zucchini.domain.image.service.ImageService;
import com.zucchini.domain.item.domain.Item;
import com.zucchini.domain.item.dto.response.FindItemListResponse;
import com.zucchini.domain.item.repository.ItemRepository;
import com.zucchini.domain.report.service.ReportService;
import com.zucchini.domain.user.domain.User;
import com.zucchini.domain.user.domain.UserItemLike;
import com.zucchini.domain.user.domain.UserItemLikeId;
import com.zucchini.domain.user.dto.request.*;
import com.zucchini.domain.user.dto.response.FindUserResponse;
import com.zucchini.domain.user.repository.UserItemLikeRepository;
import com.zucchini.domain.user.repository.UserRepository;
import com.zucchini.global.common.PageResponse;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
public class UserServiceImpl implements UserService {

    private final ImageService imageService;
    private final ReportService reportService;
    private final GradeService gradeService;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final LogoutAccessTokenRedisRepository logoutAccessTokenRedisRepository;
    private final UserItemLikeRepository userItemLikeRepository;
    private final ItemRepository itemRepository;
    private final JwtTokenUtil jwtTokenUtil;

    private final JavaMailSender javaMailSender;
    private final RedisUtil redisUtil;

    /**
     * 회원 조회(상대방)
     * @param id : 아이디
     * @return FindUserResponse : 회원 조회 응답 DTO
     */
    @Override
    @Transactional(readOnly = true)
    public FindUserResponse findUser(String id) {
        int dealCount = (int) userRepository.countItemsByStatusAndUserNo(id);
        User user = userRepository.findByNickname(id).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth.getPrincipal().equals("anonymousUser")) {
            return FindUserResponse.builder()
                    .nickname(user.getNickname())
                    .reportCount(user.getReportCount())
                    .grade(user.getGrade())
                    .dealCount(dealCount)
                    .build();
        }

        CustomUserDetails nowLogInDetail = (CustomUserDetails) auth.getPrincipal();
        String authority = nowLogInDetail.getAuthority();

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

    /**
     * 회원 조회(본인)
     * @return FindUserResponse : 회원 조회 응답 DTO
     */
    @Override
    public FindUserResponse findUser() {
        String id = getCurrentId();
        User user = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        int dealCount = (int) userRepository.countItemsByStatusAndUserNo(user.getNickname());
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

    /**
     * 회원 전체 목록 조회
     * @return List<FindUserResponse> : 상품 조회 DTO 리스트
     */
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

    /**
     * 스프링 시큐리티 인증을 통과하여 저장된 회원의 인증 객체에서 아이디 추출
     * @return String : 아이디
     */
    private String getCurrentId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return principal.getUsername();
    }

    /**
     * 회원 가입
     * @param user : 회원가입 요청 DTO
     */
    @Override
    public void addUser(AddUserRequest user) {
        if (userRepository.findById(user.getId()).isPresent())
            throw new IllegalArgumentException("이미 등록된 아이디 입니다.");

        if (!authCheck(new EmailCheckRequest(user.getEmail(), user.getAuthKey())))
            throw new UserException("이메일 인증을 다시 해주세요.");

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user.toEntity());
    }

    /**
     * 아이디 중복 검사
     * @param id : 아이디
     * @return boolean : 중복 여부
     */
    @Override
    @Transactional(readOnly = true)
    public boolean idCheck(String id) {
        return !userRepository.findById(id).isPresent();
    }

    /**
     * 이메일 인증
     * @param request : 이메일 인증 요청 DTO
     */
    @Override
    public void authEmail(EmailRequest request) {
        // 임의의 authKey 생성
        Random random = new Random();
        String authKey = String.valueOf(random.nextInt(888888) + 111111);

        // 이메일 발송
        sendAuthEmail(request.getEmail(), authKey);
    }

    /**
     * 이메일 인증 코드와 함께 회원 가입 시 기입한 이메일로 메일을 전송하는 메서드
     * @param email : 회원의 이메일
     * @param authKey : 인증 코드
     */
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

    /**
     * 이메일 인증 검사
     * @param request : 이메일 인증 검사 DTO
     * @return
     */
    @Override
    public boolean authCheck(EmailCheckRequest request) {
        return redisUtil.getData(request.getEmail()).equals(request.getAuthKey());
    }

    /**
     * 회원 정보 수정
     * @param modifyUserRequest : 회원 정보 수정 요청 DTO
     */
    @Override
    public void modifyUser(ModifyUserRequest modifyUserRequest) {
        String loginId = getCurrentId();
        // 기본키로 회원 조회
        Optional<User> user = userRepository.findById(loginId);
        if(!user.isPresent())
            throw new NoSuchElementException("해당 회원이 존재하지 않습니다.");
        User loginUser = user.get();
        loginUser.modifyUser(modifyUserRequest);
    }

    /**
     * 회원 비밀번호 변경
     * @param password : 새 비밀번호
     */
    @Override
    public void modifyPassword(String password) {
        String loginId = getCurrentId();
        Optional<User> user = userRepository.findById(loginId);
        if(!user.isPresent())
            throw new NoSuchElementException("해당 회원이 존재하지 않습니다.");
        user.get().modifyPassword(passwordEncoder.encode(password));
    }

    /**
     * 회원 탈퇴
     * @param token : Access 토큰
     * @param id : 아이디
     */
    @Override
    public void removeUser(String token, String id) {
        String currentPrincipalId = getCurrentId();
        User user;

        if (id == null) {
            user = userRepository.findById(currentPrincipalId).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
            logout(token, currentPrincipalId);
        } else {
            user = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        }
        // 탈퇴하려는 회원이 report에 있는지 확인 -> report는 id를 가지고 있으므로 해당 id 모두 delete?
        reportService.removeReport(currentPrincipalId);
        // 탈퇴하려는 회원이 매긴 별점이 존재하는지 확인 -> grade는 id를 가지고 있으므로 해당 id 모두 delete
        gradeService.removeGrade(currentPrincipalId);

        user.userDelete();
    }

    /**
     * 로그인
     * @param loginRequest : 로그인 요청 DTO
     * @return TokenDto : Access 토큰, Refresh 토큰을 저장하는 DTO
     */
    @Override
    public TokenDto login(LoginRequest loginRequest) {
        User user = userRepository.findById(loginRequest.getId()).orElseThrow(() -> new NoSuchElementException("존재하지 않는 아이디입니다."));
        if(user.getIsLocked()) throw new UserException("정지된 회원입니다.");
        checkPassword(loginRequest.getPassword(), user.getPassword());

        String id = user.getId();
        String accessToken = jwtTokenUtil.generateAccessToken(id);
        RefreshToken refreshToken = saveRefreshToken(id);
        return TokenDto.of(accessToken, refreshToken.getRefreshToken());
    }

    /**
     * Refresh 토큰 Redis에 저장하는 메서드
     * @param id : 아이디
     * @return RefreshToken : Redis에 저장된 토큰 Entity
     */
    private RefreshToken saveRefreshToken(String id) {
        return refreshTokenRedisRepository.save(RefreshToken.createRefreshToken(id,
                jwtTokenUtil.generateRefreshToken(id), JwtExpirationEnums.REFRESH_TOKEN_EXPIRATION_TIME.getValue()));
    }

    /**
     * 패스워드 일치 확인
     * @param rawPassword : 로그인 시도에서 입력된 패스워드 평문(암호화 X)
     * @param findUserPassword : 해당 회원의 원래 비밀번호(암호화 O)
     */
    private void checkPassword(String rawPassword, String findUserPassword) {
        if (!passwordEncoder.matches(rawPassword, findUserPassword)) {
            throw new IllegalArgumentException("비밀번호가 맞지 않습니다.");
        }
    }

    /**
     * 로그아웃
     * @param accessToken : JWT 토큰
     * @param id : 아이디
     */
    @Override
    @CacheEvict(value = CacheKey.USER, key = "#id")
    public void logout(String accessToken, String id) {
        long remainMilliSeconds = jwtTokenUtil.getRemainMilliSeconds((accessToken));
        refreshTokenRedisRepository.deleteById(id);
        logoutAccessTokenRedisRepository.save(LogoutAccessToken.of(accessToken, id, remainMilliSeconds));
    }

    /**
     * 토큰을 추출하는 메서드
     * @param token : 토큰 문자열
     * @return String : Bearer 을 분리한 토큰 값
     */
    private String resolveToken(String token) {
        return token.substring(7);
    }

    /**
     * Access 토큰 재발행
     * @param refreshToken : JWT 토큰
     * @return TokenDto : Access 토큰, Refresh 토큰을 저장하는 DTO
     */
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

    /**
     * 토큰에서 아이디 추출
     * @param token : Access 토큰
     * @return String : 아이디
     */
    private String getCurrentUsername(String token) {
        return jwtTokenUtil.extractAllClaims(token).get("id", String.class);
    }

    /**
     * Refresh 토큰 재발급
     * Refresh 토큰의 남은 유효기간이 JwtExpirationEnums.REISSUE_EXPIRATION_TIME 보다 작은 경우 Access 토큰만 재발급
     * @param refreshToken : JWT 토큰
     * @param username : 아이디
     * @return TokenDto : Access 토큰, Refresh 토큰을 저장하는 DTO
     */
    private TokenDto reissueRefreshToken(String refreshToken, String username) {
        if (lessThanReissueExpirationTimesLeft(refreshToken)) {
            String accessToken = jwtTokenUtil.generateAccessToken(username);
            return TokenDto.of(accessToken, saveRefreshToken(username).getRefreshToken());
        }
        return TokenDto.of(jwtTokenUtil.generateAccessToken(username), refreshToken);
    }

    /**
     * Refresh 토큰의 남은 유효기간이 JwtExpirationEnums.REISSUE_EXPIRATION_TIME보다 작은지 확인
     * @param refreshToken : JWT 토큰
     * @return boolean : 비교 결과
     */
    private boolean lessThanReissueExpirationTimesLeft(String refreshToken) {
        return jwtTokenUtil.getRemainMilliSeconds(refreshToken) < JwtExpirationEnums.REISSUE_EXPIRATION_TIME.getValue();
    }

    /**
     * 상품 찜 등록
     * @param itemNo : 상품 번호
     */
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

    /**
     * 찜 목록 조회
     * @param keyword : 검색어
     * @return List<FindItemListResponse> : 상품 목록 조회 DTO 리스트
     */
    @Override
    @Transactional(readOnly = true)
    public List<FindItemListResponse> findUserLikeItemList(String keyword) {
        String id = getCurrentId();
        List<Item> userItemLikeList = userItemLikeRepository.findAllByUserId(id, keyword);
        return userItemLikeList.stream()
                .map(userItemLike -> FindItemListResponse.builder()
                        .no(userItemLike.getNo())
                        .title(userItemLike.getTitle())
                        .createdAt(userItemLike.getCreatedAt())
                        .content(userItemLike.getContent())
                        .price(userItemLike.getPrice())
                        .status(userItemLike.getStatus())
                        .image(getItemImage(userItemLike.getNo()))
                        .likeCount(userItemLikeRepository.countById_ItemNo(userItemLike.getNo()))
                        .categoryList(getCategory(userItemLike.getCategoryList()))
                        .build())
                .collect(Collectors.toList());
    }

    /**
     * 찜 목록 조회(페이징)
     * @param keyword : 검색어
     * @param pageable : 페이지 정보
     * @return PageResponse<FindItemListResponse> : 상품 목록 조회 DTO 리스트
     */
    @Override
    public PageResponse<FindItemListResponse> findUserLikeItemList(String keyword, Pageable pageable, int category) {
        String loginId = getCurrentId();
        Page<Item> pageItemList = userItemLikeRepository.findPageUserLikeItems(loginId, keyword, pageable, category);

        return getFindItemListResponsePageResponse(pageItemList);
    }

    /**
     * 거래 내역 조회
     * 회원의 거래내역, 구매내역인지 판매내역인지 판별하고, 거래 상태를 조회함
     * 아이템 테이블에서 buyer, seller 보면서 나랑 겹치는거 있는지 확인 (내가 buyer인지 seller인지)
     * 그리고 status 보면서 거래상태 값 리턴해주면 됨
     * flag 넘어오는거 false면 판매내역, true면 구매내역으로 구현
     * @param keyword : 검색어
     * @param flag : 상품 분류(구매, 판매)
     * @return List<UserDealHistoryResponse> : 거래 내역 조회 DTO 리스트
     */
    @Override
    @Transactional(readOnly = true)
    public PageResponse<FindItemListResponse> findUserDealHistoryList(String keyword, boolean flag, Pageable pageable, String name, int category) {
        String id = null;

        if (name == null) {
            id = getCurrentId();
        } else {
            User user = userRepository.findByNickname(name).orElseThrow(() -> new NoSuchElementException("해당하는 회원이 존재하지 않습니다."));
            id = user.getId();
        }

        Page<Item> pageItemList = null;

        if (flag) {
            pageItemList = userRepository.findPageBuyListByUser(id, keyword, pageable);
        } else {
            pageItemList = userRepository.findPageSellListByUser(id, keyword, pageable, category);
        }

        return getFindItemListResponsePageResponse(pageItemList);
    }

    private PageResponse<FindItemListResponse> getFindItemListResponsePageResponse(Page<Item> pageItemList) {
        return new PageResponse<>(pageItemList.getContent().stream().map(item -> FindItemListResponse.builder().no(item.getNo())
                .title(item.getTitle())
                .createdAt(item.getCreatedAt())
                .content(item.getContent())
                .price(item.getPrice())
                .status(item.getStatus())
                .image(getItemImage(item.getNo()))
                .likeCount(userItemLikeRepository.countById_ItemNo(item.getNo()))
                .categoryList(getCategory(item.getCategoryList()))
                .build()).collect(Collectors.toList()), pageItemList.getTotalPages());
    }

    /**
     * 상품 이미지 조회
     * @param itemNo : 상품 번호
     * @return String : 이미지 링크
     */
    private String getItemImage(int itemNo) {
        List<String> imageList = imageService.findImageLinkList(itemNo);
        if (imageList.isEmpty())
            return null;
        return imageList.get(0);
    }

    /**
     * 상품의 카테고리 리스트 추출
     * @param itemCategoryList : ItemCategory Entity 리스트
     * @return List<String> : 카테고리 목록
     */
    private List<String> getCategory(List<ItemCategory> itemCategoryList) {
        List<String> categoryList = new ArrayList<>();
        for (ItemCategory itemCategory : itemCategoryList) {
            categoryList.add(itemCategory.getCategory().getCategory());
        }
        return categoryList;
    }

    /**
     * 상품 찜 취소
     * @param itemNo : 상품 번호
     */
    @Override
    public void removeUserLikeItem(int itemNo) {
        String id = getCurrentId();
        userItemLikeRepository.deleteByUserIdAndItemNo(id, itemNo);
    }

    /**
     * 닉네임 중복 검사
     * @param nickname
     * @return
     */
    @Override
    public Boolean nicknameCheck(String nickname) {
        return !userRepository.findByNickname(nickname).isPresent();
    }

}
