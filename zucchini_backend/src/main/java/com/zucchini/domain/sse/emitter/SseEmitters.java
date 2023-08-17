package com.zucchini.domain.sse.emitter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;

@Component
@Slf4j
public class SseEmitters {

    private static final AtomicLong counter = new AtomicLong();
    private final ConcurrentHashMap<Integer, List<SseEmitter>> emitterConcurrentHashMap = new ConcurrentHashMap<>();

    public SseEmitter add(SseEmitter emitter, int conferenceNo) {
        if (!emitterConcurrentHashMap.containsKey(conferenceNo)) {
            emitterConcurrentHashMap.put(conferenceNo, new ArrayList<>());
        }

        emitterConcurrentHashMap.get(conferenceNo).add(emitter);

        emitter.onCompletion(() -> {
            log.info("onCompletion callback");
//            this.emitters.remove(emitter);    // 만료되면 리스트에서 삭제
            emitterConcurrentHashMap.get(conferenceNo).remove(emitter);
        });

        emitter.onTimeout(() -> {
            log.info("onTimeout callback");
            emitter.complete();
        });

        return emitter;
    }

    public void count(String nickname, Boolean buy, int conferenceNo) {
        long count = counter.incrementAndGet();
        log.info("nickname: {}", nickname);
        log.info("buy: {}", buy);
        log.info("conferenceNo: {}", conferenceNo);
        if (buy == null){
            emitterConcurrentHashMap.get(conferenceNo).forEach(emitter -> {
                try {
                    emitter.send(SseEmitter.event()
                            .name("requestDeal")
                            .data(nickname));
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            });
        } else if (buy) {
            emitterConcurrentHashMap.get(conferenceNo).forEach(emitter -> {
                try {
                    emitter.send(SseEmitter.event()
                            .name("buy")
                            .data(nickname));
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            });
        } else {
            emitterConcurrentHashMap.get(conferenceNo).forEach(emitter -> {
                try {
                    emitter.send(SseEmitter.event()
                            .name("notbuy")
                            .data(nickname));
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            });
        }
    }

}
