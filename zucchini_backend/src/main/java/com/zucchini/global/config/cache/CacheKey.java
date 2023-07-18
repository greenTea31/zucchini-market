package com.zucchini.global.config.cache;

import lombok.Getter;

@Getter
public class CacheKey {

    public static final String USER = "com/zucchini/domain/user";
    public static final int DEFAULT_EXPIRE_SEC = 60;
}