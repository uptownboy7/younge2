<?php
header("Content-Type: text/html; charset=UTF-8");
 
if(empty($_POST['checker1'])	|| 
   empty($_POST['checker2'])	|| 
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL)) 
   {

    
    $str="빈칸을 채워주시거나 체크박스에 동의를 해주셔야 원활한 진행이 가능합니다!
    backspace키를 눌러주세요!"; 
echo "<font size=7>".$str; 
    //echo "빈칸을 채워주시거나 체크박스에 동의를 해주셔야 원활한 진행이 가능합니다!";
    
	return false;
    
   }

else {
    
    $str="CT매거진이 전송되었습니다. 감사합니다."; 
echo "<font size=7>".$str; 
    // echo  "담당 인원에게 전송되었습니다. 감사합니다.";
    
}
 
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$checker1 = strip_tags(htmlspecialchars($_POST['checker1']));
$checker2 = strip_tags(htmlspecialchars($_POST['checker2']));
$checker3 = include 'ctmail2.php'

$to = strip_tags(htmlspecialchars($_POST['email']));
$email_subject = "FROM:  $name"; 
$email_body = "영에게 도착한 문의사항입니다..\n\n"."세부정보는 다음과 같습니다.\n\n이름: $name\n\n직책: $position\n\n이메일: $email_address\n\n전화번호: $phone\n\n문의내용:\n$message";
$headers = "Reply-To: $email_address\r";
 
mail($to,'=?UTF-8?B?'.base64_encode($email_subject).'?=',$email_body,$headers);
return true;			
?>
