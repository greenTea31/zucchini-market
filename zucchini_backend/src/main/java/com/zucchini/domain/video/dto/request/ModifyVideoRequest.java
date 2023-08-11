package com.zucchini.domain.video.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ModifyVideoRequest {

    @NotBlank
    String link;

}
