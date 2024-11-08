import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailScreen = ({ route, navigation }) => {
  // Lấy thông tin sản phẩm từ params
  const { product } = route.params;

  const addToFavorites = async (product) => {
    try {
      // Lấy danh sách yêu thích từ AsyncStorage
      let favorites = await AsyncStorage.getItem("favorites");
      favorites = favorites ? JSON.parse(favorites) : [];

      // Kiểm tra nếu sản phẩm đã có trong danh sách yêu thích
      const isAlreadyFavorite = favorites.some(
        (item) => item.id === product.id
      );
      if (isAlreadyFavorite) {
        alert("This product is already in your favorites.");
        return;
      }

      // Thêm sản phẩm vào danh sách yêu thích
      favorites.push(product);
      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Added to favorites!");
    } catch (error) {
      console.error(error);
    }
  };
  console.log("product", product);

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.productName}</Text>
      <Text style={styles.productPrice}>Price: {product.price}</Text>
      <Text style={styles.productDeal}>Deal: {product.limitTimeDeal}%</Text>
      {product.isGift && (
        <Text style={styles.giftLabel}>🎁 This product includes a gift!</Text>
      )}

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => addToFavorites(product)}
      >
        <Text style={styles.favoriteText}>Add to Favorites ❤️</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
    alignItems: "center",
  },
  productImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: "#555",
    marginBottom: 10,
  },
  productDeal: {
    fontSize: 18,
    color: "#28a745",
    marginBottom: 10,
  },
  giftLabel: {
    color: "#d9534f",
    fontWeight: "bold",
    marginBottom: 20,
  },
  favoriteButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  favoriteText: {
    color: "#fff",
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default DetailScreen;
