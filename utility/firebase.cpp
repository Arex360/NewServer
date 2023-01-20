#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include <curl/curl.h>
#include <json/json.h>
void send(std::string,std::string);
int main(int argc, char* argv[]) {
    if (argc != 2) {
       // std::cout << "Usage: " << argv[0] << " <inputfile>" << std::endl;
        return 1;
    }
    std::ifstream image_file(argv[1], std::ios::binary);
    std::vector<unsigned char> buffer((std::istreambuf_iterator<char>(image_file)), 
                                      (std::istreambuf_iterator<char>()));
    std::string base64 = base64_encode(buffer.data(), buffer.size());
    //std::cout << base64 << std::endl;
    send("123","10","10");
    return 0;
}
void send(std::string clientID,std::string tempreture,std::string humidity){
     CURL *curl;
     CURLcode res;
     curl = curl_easy_init();
    if(curl) {
        std::string body = "{\"client\":\"" + clientID + "\",\"humidity\":\"" + humidity + "\",\"tempreture\":\"" + tempreture + "\"}";
        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");

        curl_easy_setopt(curl, CURLOPT_URL, "http://34.125.238.213:5000/insertTempreture");
        curl_easy_setopt(curl, CURLOPT_POST, 1);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, body.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);

        res = curl_easy_perform(curl);
        if(res != CURLE_OK) {
    std::cerr << "cURL request failed: " << curl_easy_strerror(res) << std::endl;
     }
}
}
