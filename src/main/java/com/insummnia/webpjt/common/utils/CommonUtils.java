package com.insummnia.webpjt.common.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class CommonUtils {

    public static String decodeStr(String params) throws Exception {

        byte[] binary = Base64.getDecoder().decode(params);

        String rtnString = "";
        rtnString = new String(binary);

        return rtnString;

    }
    
    public static String encodePwd(String password) throws Exception {

        // 리턴 받을 암호화된 패스워드
        String rtnPassword = "";

        try {
            MessageDigest msgDigest = MessageDigest.getInstance("SHA-256");
            msgDigest.update(password.getBytes());

            byte[] binary = msgDigest.digest();
            StringBuffer strBuffer = new StringBuffer();

            for(int i=0; i<binary.length; i++){
                strBuffer.append(Integer.toString((binary[i]&0xff) + 0x100, 32).substring(1));
            }

            rtnPassword = strBuffer.toString();

        } catch (NoSuchAlgorithmException e) {
            rtnPassword = "";
        }

        return rtnPassword;

    }
    
}
