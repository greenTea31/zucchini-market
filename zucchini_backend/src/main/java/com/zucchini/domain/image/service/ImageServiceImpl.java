package com.zucchini.domain.image.service;

import com.zucchini.domain.image.domain.Image;
import com.zucchini.domain.image.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;

    /**
     * 사진 링크 저장
     */
    @Override
    public void addImage(int itemNo, List<String> linkList) {
        List<Image> imageList = linkList.stream()
                .map(link -> Image.builder()
                        .itemNo(itemNo)
                        .link(link)
                        .build())
                .collect(Collectors.toList());
        imageRepository.saveAll(imageList);
    }

    /**
     * 사진 링크 수정
     */
    @Override
    public void modifyImage(int itemNo, List<String> linkList) {
        // 일단 기존에 저장되어 있던 링크들 전부 삭제
        imageRepository.deleteAllByItemNo(itemNo);
        // 새로 삽입
        addImage(itemNo, linkList);
    }

    /**
     * 해당 아이템의 사진 링크 리스트 조회
     */
    @Override
    public List<String> findImageLinkList(int itemNo) {
        return imageRepository.findAllByItemNo(itemNo).stream()
                .map(image -> image.getLink())
                .collect(Collectors.toList());
    }

}
