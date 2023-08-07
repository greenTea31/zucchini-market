package com.zucchini.domain.session.service;

import com.zucchini.domain.conference.domain.Conference;
import com.zucchini.domain.conference.repository.ConferenceRepository;
import com.zucchini.domain.reservation.domain.Reservation;
import com.zucchini.domain.reservation.repository.ReservationRepository;
import com.zucchini.domain.session.dto.response.SessionResponse;
import com.zucchini.domain.user.domain.User;
import com.zucchini.domain.user.repository.UserRepository;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.hc.core5.http.HttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
@RequiredArgsConstructor
public class SessionServiceImpl implements SessionService {


    private ConferenceRepository conferenceRepository;
    private ReservationRepository reservationRepository;
    private UserRepository userRepository;

    private OpenVidu openVidu;
    private Map<Integer, Session> mapSessions = new ConcurrentHashMap<>();
    // Collection to pair session names and tokens (the inner Map pairs tokens and
    // role associated)
    private Map<Integer, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();

//    @Value("${openvidu.url}")
    private String OPENVIDU_URL;
    // Secret shared with our OpenVidu server
//    @Value("${openvidu.secret}")
    private String SECRET;

    @Autowired
    public SessionServiceImpl(@Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String openviduUrl, ConferenceRepository conferenceRepository,
                              ReservationRepository reservationRepository, UserRepository userRepository, RedisTemplate<String, String> redisTemplate) {
        this.conferenceRepository = conferenceRepository;
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.SECRET = secret;
        this.OPENVIDU_URL = openviduUrl;
        this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
//        this.redisTemplate = redisTemplate;
    }

    @Override
    public SessionResponse findConferenceSession(int no, HttpSession httpSession, HttpResponse response)
            throws OpenViduJavaClientException, OpenViduHttpException {
        log.info("no========================={}", no);
        Optional<Conference> conference = conferenceRepository.findById(no);
        // 없는 컨퍼런스면 예외 처리
        if(!conference.isPresent()) throw new NoSuchElementException("컨퍼런스가 없습니다.");

        String userId = getCurrentId();
        User user = userRepository.findById(userId).get();
        List<Reservation> reservationList = reservationRepository.findByConferenceNoAndUser(no, user);
        // 해당 컨퍼런스에 접근 권한이 없는 회원인 경우 예외 처리
        if(reservationList.size() == 0) throw new IllegalArgumentException("권한이 없습니다");

        OpenViduRole role = OpenViduRole.PUBLISHER;

        String token = getToken(user, role, no, httpSession);

        return new SessionResponse(role, token, user.getNickname());
    }

    private String getToken(User user, OpenViduRole role, int no, HttpSession httpSession) throws OpenViduJavaClientException, OpenViduHttpException {
        String serverData = "{\"serverData\": \"" + user.getNickname() + "\"}";
        System.out.println("serverData : "+serverData);

        ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(ConnectionType.WEBRTC)
                .role(role).data(serverData).build();

        String token = "";
        // 검색하는 방이 존재하지 않을 경우
        if (this.mapSessions.get(no) == null) {
            // session 값 생성
            log.info("openvidu==============={}", this.openVidu);
            Session session = this.openVidu.createSession();
            log.info("방이 없는 경우에 진입 roomId: {}, sessionId: {}", no,session.getSessionId());
            try{
                token = session.createConnection(connectionProperties).getToken();
                // 방 관리 map에 저장 roomId랑 들어온 유저 저장
                this.mapSessions.put(no, session);
                this.mapSessionNamesTokens.put(no, new ConcurrentHashMap<>());
                this.mapSessionNamesTokens.get(no).put(token, role);
            }catch (Exception e){
                httpSession.setAttribute("error",e);
            }
        }else{
            log.info("방이 있는 경우에 진입 roomId: {}, sessionId: {}", no, mapSessions.get(no).getSessionId());
            try{
                token = this.mapSessions.get(no).createConnection(connectionProperties).getToken();
                this.mapSessionNamesTokens.get(no).put(token, role);
            }catch (Exception e){
                httpSession.setAttribute("error",e);
            }
        }
        System.out.println("token :"+ token );
        return token;
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

}
