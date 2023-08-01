package com.zucchini.domain.conference.api;

import com.zucchini.domain.conference.dto.FindConferenceResponse;
import com.zucchini.domain.conference.service.ConferenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/conference")
public class ConferenceController {

    private final ConferenceService conferenceService;

    @GetMapping("/{no}")
    public ResponseEntity<FindConferenceResponse> findConference(@PathVariable int no) {
        FindConferenceResponse response = conferenceService.findConference(no);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{no}")
    public ResponseEntity<Void> cancelConference(@PathVariable int no) {
        conferenceService.cancelConference(no);
        return ResponseEntity.ok().build();
    }

}
