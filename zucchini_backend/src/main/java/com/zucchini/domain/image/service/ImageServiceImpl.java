package com.zucchini.domain.image.service;

import com.zucchini.domain.image.domain.Image;
import com.zucchini.domain.image.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;

    /**
     * 상품 사진 추가
     * @param itemNo : 상품 번호
     * @param linkList : 상품의 사진 링크 리스트
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
     * 상품 사진 수정
     * @param itemNo : 상품 번호
     * @param linkList : 상품의 사진 링크 리스트
     */
    @Override
    public void modifyImage(int itemNo, List<String> linkList) {
        // 일단 기존에 저장되어 있던 링크들 전부 삭제
        imageRepository.deleteAllByItemNo(itemNo);
        // 새로 삽입
        addImage(itemNo, linkList);
    }

    /**
     * 상품 사진 링크 조회
     * @param itemNo : 상품 번호
     * @return List<String> : 상품 링크 리스트
     */
    @Override
    @Transactional(readOnly = true)
    public List<String> findImageLinkList(int itemNo) {
        return imageRepository.findAllByItemNo(itemNo).stream()
                .map(image -> image.getLink())
                .collect(Collectors.toList());
    }

}
