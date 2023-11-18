#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

const char *ssid = "Coolest Wi-Fi to connect";
const char *password = "anonymous";

int ledPin = D1;  // Replace with the pin connected to your LED
int fadeAmount = 5;

ESP8266WebServer server(80);

void setup() {
  Serial.begin(115200);
  Serial.print("Connecting to: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while(WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
  server.begin();

  // Define the endpoint to receive sound values
  server.on("/sound", HTTP_POST, []() {
      // Retrieve sound values from the request and adjust LED fading
      int soundValue = (server.arg("value")).toFloat();
      analogWrite(ledPin, static_cast<int>(soundValue));
      Serial.println(soundValue);

      server.send(200, "text/plain", "LED adjusted");
  });

  server.begin();
}

void loop() {
  server.handleClient();
}
