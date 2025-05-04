import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
  value?: string;
}

const SearchBar = ({ onPress, placeholder, value, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center bg-zinc-700 rounded px-5 py-2 mt-5">
      <FontAwesome5 name="search" color="#a8b5db" size={20} />

      <TextInput
        onFocus={onPress} // Changed from onPress to onFocus
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={"#a8b5db"}
        className="flex-1 ml-2 text-white"
        autoCapitalize="none"
      />
    </View>
  );
};

export default SearchBar;
