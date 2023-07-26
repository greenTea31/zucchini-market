package com.zucchini.domain.image.service;

import java.util.List;

public interface ImageService {

    void addImage(int itemNo, List<String> linkList);
    void modifyImage(int itemNo, List<String> linkList);
    List<String> findImageLinkList(int itemNo);

}
