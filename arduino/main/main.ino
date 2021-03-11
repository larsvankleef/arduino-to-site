int values[4];

void setup() {
  Serial.begin(9600);
}

void loop() {
  values[0] = analogRead(A0);
  values[1] = analogRead(A1);
  values[2] = analogRead(A2);
  values[3] = analogRead(A3);
   
  Serial.print(values[0]);
  Serial.print(", ");
  Serial.print(values[1]);
  Serial.print(", ");
  Serial.print(values[2]);
  Serial.print(", ");
  Serial.print(values[3]);
  Serial.print("\n");
  
  delay(500);
}
