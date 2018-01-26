package com.ora.test;

import org.junit.Test;

import java.security.MessageDigest;

public class Md5Test {
    //md5加密测试
    @Test
    public void test01() throws Exception {
        String plainText = "liuge1..";
        //创建md5对象
        MessageDigest md5 = MessageDigest.getInstance("md5");
        //进行加密操作
        byte[] cipherData = md5.digest(plainText.getBytes());
        StringBuilder builder = new StringBuilder();
        for(byte cipher : cipherData) {
            //将其中的每个字节转成十六进制字符串：byte类型的数据最高位是符号位，通过和0xff进行与操作，转换为int类型的正整数
            String toHexStr = Integer.toHexString(cipher & 0xff);
            //如果该正数小于16(长度为1个字符)，前面拼接0占位：确保最后生成的是32位字符串
            builder.append(toHexStr.length() == 1 ? "0" + toHexStr : toHexStr);
        }
        System.out.println(builder.toString());
    }
}
