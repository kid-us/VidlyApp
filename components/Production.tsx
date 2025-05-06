import { Text, View } from "react-native";

interface ProductionItems {
  id: number | string;
  name: string;
}

interface ProductionProps {
  production: ProductionItems[];
}

const Production = ({ production }: ProductionProps) => {
  return (
    <>
      <Text className="text-zinc-300">Production Companies</Text>
      <View className="flex-row flex-wrap gap-x-3 justify-start mt-2 mb-8">
        {production.map((p) => (
          <Text key={p.id} className="text-zinc-500 py-1 rounded text-sm">
            {p.name}
          </Text>
        ))}
      </View>
    </>
  );
};

export default Production;
