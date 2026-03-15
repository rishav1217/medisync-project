<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");

$api_key = "YOUR_GROQ_API_KEY";


$input = json_decode(file_get_contents("php://input"), true);
$message = $input["message"] ?? "";

if(!$message){
echo json_encode([
"success"=>false,
"reply"=>"Please type a message."
]);
exit;
}

$data = [
"model"=>"llama-3.1-8b-instant",
"messages"=>[
[
"role"=>"system",
"content"=>"You are a medical AI assistant. Answer in maximum 3 short sentences. Suggest possible illness and simple advice."
],
[
"role"=>"user",
"content"=>$message
]
]
];

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL,"https://api.groq.com/openai/v1/chat/completions");
curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
curl_setopt($ch, CURLOPT_POST,true);

curl_setopt($ch, CURLOPT_HTTPHEADER,[
"Authorization: Bearer ".$apiKey,
"Content-Type: application/json"
]);

curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($data));

$response = curl_exec($ch);

if(curl_errno($ch)){
echo json_encode([
"success"=>false,
"reply"=>"Connection error: ".curl_error($ch)
]);
exit;
}

curl_close($ch);

$result = json_decode($response,true);

if(isset($result["error"])){
echo json_encode([
"success"=>false,
"reply"=>$result["error"]["message"]
]);
exit;
}

$reply = $result["choices"][0]["message"]["content"] ?? "AI could not respond.";

echo json_encode([
"success"=>true,
"reply"=>$reply
]);