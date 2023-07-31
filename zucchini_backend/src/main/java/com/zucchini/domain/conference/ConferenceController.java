package com.zucchini.domain.conference;

import com.zucchini.domain.conference.dto.FindConferenceResponse;
import com.zucchini.domain.conference.service.ConferenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/conference")
public class ConferenceController {

    private final ConferenceService conferenceService;

    @GetMapping("{no}")
    public ResponseEntity<FindConferenceResponse> addConference(@PathVariable int no) {
        FindConferenceResponse response = conferenceService.findConference(no);
        return ResponseEntity.ok(response);
    }

}
