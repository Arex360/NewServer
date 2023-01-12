#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include <curl/curl.h>
#include <json/json.h>
std::string base64_encode(unsigned char const* , unsigned int len);
void send(std::string,std::string);
int main(int argc, char* argv[]) {
    // check for proper syntax
    if (argc != 2) {
        std::cout << "Usage: " << argv[0] << " <inputfile>" << std::endl;
        return 1;
    }

    // read image
    std::ifstream image_file(argv[1], std::ios::binary);
    std::vector<unsigned char> buffer((std::istreambuf_iterator<char>(image_file)), 
                                      (std::istreambuf_iterator<char>()));

    // convert to base64
    std::string base64 = base64_encode(buffer.data(), buffer.size());

    // print result
    std::cout << base64 << std::endl;
    send(base64,"owais");
    return 0;
}
void send(std::string base64,std::string client){
     CURL *curl;
     CURLcode res;
     curl = curl_easy_init();
    if(curl) {
        std::string body = "{\"base64\":\"" + base64 + "\",\"client\":\"" + client + "\"}";
        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");

        curl_easy_setopt(curl, CURLOPT_URL, "http://34.125.238.213:5000/postImage");
        curl_easy_setopt(curl, CURLOPT_POST, 1);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, body.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);

        res = curl_easy_perform(curl);
        if(res != CURLE_OK) {
    std::cerr << "cURL request failed: " << curl_easy_strerror(res) << std::endl;
     }
}
}
std::string base64_encode(unsigned char const* bytes_to_encode, unsigned int in_len) {
    std::string ret;
    int i = 0;
    int j = 0;
    unsigned char char_array_3[3];
    unsigned char char_array_4[4];

    const std::string base64_chars = 
             "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
             "abcdefghijklmnopqrstuvwxyz"
             "0123456789+/";

    while (in_len--) {
        char_array_3[i++] = *(bytes_to_encode++);
        if (i == 3) {
            char_array_4[0] = (char_array_3[0] & 0xfc) >> 2;
            char_array_4[1] = ((char_array_3[0] & 0x03) << 4) + ((char_array_3[1] & 0xf0) >> 4);
            char_array_4[2] = ((char_array_3[1] & 0x0f) << 2) + ((char_array_3[2] & 0xc0) >> 6);
            char_array_4[3] = char_array_3[2] & 0x3f;

            for(i = 0; (i <4) ; i++)
                ret += base64_chars[char_array_4[i]];
            i = 0;
        }
    }

    if (i)
    {
        for(j = i; j < 3; j++)
            char_array_3[j] = '\0';

        char_array_4[0] = (char_array_3[0] & 0xfc) >> 2;
        char_array_4[1] = ((char_array_3[0] & 0x03) << 4) + ((char_array_3[1] & 0xf0) >> 4);
       char_array_4[2] = ((char_array_3[1] & 0x0f) << 2) + ((char_array_3[2] & 0xc0) >> 6);
        char_array_4[3] = char_array_3[2] & 0x3f;

        for (j = 0; (j < i + 1); j++)
            ret += base64_chars[char_array_4[j]];

        while((i++ < 3))
            ret += '=';
    }
    return ret;
}

