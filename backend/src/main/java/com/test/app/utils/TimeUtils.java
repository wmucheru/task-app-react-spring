package com.test.app.utils;

import java.time.LocalDateTime;

public class TimeUtils {
    public static String now(){
        return LocalDateTime.now().toString();
    }
}
