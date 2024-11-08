import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const FavoriteScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchFavorites = async () => {
        try {
          let favorites = await AsyncStorage.getItem("favorites");
          favorites = favorites ? JSON.parse(favorites) : [];
          setFavorites(favorites);
        } catch (error) {
          console.error("Failed to load favorites:", error);
        }
      };
      fetchFavorites();
    }, [])
  );

  const removeFromFavorites = async (productId) => {
    try {
      const updatedFavorites = favorites.filter(
        (item) => item.id !== productId
      );
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      alert("Removed from favorites!");
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Detail", { product: item })}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                />
                <Text style={styles.productName}>{item.productName}</Text>
                <Text style={styles.productPrice}>Price: {item.price}</Text>
                <Text style={styles.productDeal}>
                  Deal: {item.limitTimeDeal}%
                </Text>
                {item.isGift && <Text style={styles.giftLabel}>🎁 Gift</Text>}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromFavorites(item.id)}
              >
                <Text style={styles.removeText}>Remove from Favorites ❌</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No favorites added yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 10,
  },
  productContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: "#555",
  },
  productDeal: {
    fontSize: 16,
    color: "#28a745",
    marginBottom: 10,
  },
  giftLabel: {
    color: "#d9534f",
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  removeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});

export default FavoriteScreen;
