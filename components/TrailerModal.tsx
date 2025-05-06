import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const TrailerModal = ({
  videoId,
  onClose,
}: {
  videoId: string;
  onClose: () => void;
}) => {
  return (
    <View style={styles.backdrop} className="absolute w-full h-full z-50">
      <TouchableOpacity
        className="absolute top-8 left-2 right-0 mx-2 w-14 h-14 bg-zinc-900/80 border border-gray-700 rounded-3xl py-3.5 items-center justify-center z-50"
        onPress={onClose}
      >
        <FontAwesome name="close" color="#eee" size={20} />
      </TouchableOpacity>

      <View style={styles.modalContent}>
        <YoutubePlayer height={300} videoId={videoId} play={true} />
      </View>
    </View>
  );
};

export default TrailerModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(12, 1, 1, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: "99%",
    borderRadius: 10,
    padding: 3,
  },
});
