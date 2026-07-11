import { ThemeToggle } from '@/components/button-theme';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Link, Stack } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';


export const SCREEN_OPTIONS = {
  title: 'Meusom',
  headerTransparent: true,
  headerRight: () => <ThemeToggle />,
};

export default function Screen() {
  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <View className="flex-1 items-center justify-center gap-8 p-4">
        <View className="gap-2 p-4">
          <Text variant="h3" className="ios:text-foreground text-muted-foreground font-mono">
            Click para encontrar
          </Text>
        </View>
        <View className="flex-row gap-2">
          <Link href="/download" asChild>
            <Button variant="destructive" className="h-40 w-40 rounded-full">
              <Text className="text-lg">Ouvir</Text>
            </Button>
          </Link>
        </View>
      </View>
    </>
  );
}
