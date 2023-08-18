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
