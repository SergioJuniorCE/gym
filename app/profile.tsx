import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const PROFILE_OPTIONS = [
  {
    title: 'Personal Information',
    icon: 'user',
    items: [
      { label: 'Name', value: 'John Doe' },
      { label: 'Email', value: 'john@example.com' },
      { label: 'Height', value: '180 cm' },
      { label: 'Weight', value: '75 kg' },
    ],
  },
  {
    title: 'Preferences',
    icon: 'cog',
    items: [
      { label: 'Units', value: 'Metric' },
      { label: 'Notifications', value: 'On' },
      { label: 'Dark Mode', value: 'Off' },
    ],
  },
  {
    title: 'App Settings',
    icon: 'cog',
    items: [
      { label: 'Language', value: 'English' },
      { label: 'Privacy Policy', value: '' },
      { label: 'Terms of Service', value: '' },
    ],
  },
];

export default function Profile() {
  return (
    <ScrollView className="flex-1 bg-primary">
      {/* Profile Header */}
      <View className="bg-surface p-4 border-b border-primary-dark">
        <View className="items-center">
          <View className="w-24 h-24 rounded-full bg-accent/20 items-center justify-center mb-4">
            <FontAwesome name="user" size={48} color="#22c55e" />
          </View>
          <Text className="text-2xl font-bold text-white">John Doe</Text>
          <Text className="text-gray-300">Fitness Enthusiast</Text>
        </View>
      </View>

      {/* Profile Options */}
      <View className="p-4">
        {PROFILE_OPTIONS.map((section) => (
          <View key={section.title} className="mb-6">
            <View className="flex-row items-center mb-4">
              <FontAwesome
                name={section.icon as 'user' | 'cog'}
                size={20}
                color="#22c55e"
              />
              <Text className="text-lg font-semibold text-white ml-2">
                {section.title}
              </Text>
            </View>
            <View className="bg-surface rounded-xl overflow-hidden">
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={item.label}
                  className={`flex-row items-center justify-between p-4 ${
                    index !== section.items.length - 1
                      ? 'border-b border-primary-dark'
                      : ''
                  }`}
                >
                  <Text className="text-white">{item.label}</Text>
                  <View className="flex-row items-center">
                    <Text className="text-gray-300 mr-2">{item.value}</Text>
                    {item.value && (
                      <FontAwesome
                        name="chevron-right"
                        size={14}
                        color="#6b7280"
                      />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
