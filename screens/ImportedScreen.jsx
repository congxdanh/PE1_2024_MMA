import React from "react";
import { Button, View } from "react-native";

const ImportedScreen = ({ navigation }) => {
  const product = {
    productName: "Sample Product",
    limitTimeDeal: 50,
    image: "https://example.com/image.jpg",
    cover: 180,
    price: 260000,
    nation: "Vietnam",
    category: "Health",
    packaging: "tube",
    isGift: true,
  };

  return (
    <View>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Detail", product)}
      />
    </View>
  );
};

export default ImportedScreen;
