<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html> 
<html lang="ko"> 
    <head> 
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
        <title>Main Page</title> 
    </head>
    <script>
        function goToRegist(){
            window.location.href = "/user/regist.do";
        }
    </script> 
    <body>
        <Button type="button" onClick="goToRegist();">회원가입</Button>
    </body> 
</html>