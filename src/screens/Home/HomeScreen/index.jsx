import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Box,
  Button,
  Checkbox,
  FlatList,
  Heading,
  HStack,
  Input,
  Text,
  VStack
} from 'native-base';
import React, { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const tasks = await AsyncStorage.getItem('tasks');
      if (tasks) {
        setTasks(JSON.parse(tasks));
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  };

  const addTask = () => {
    if (taskInput.trim() === '') return;
    const newTask = { id: Date.now().toString(), text: taskInput, done: false };
    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);
    setTaskInput('');
    saveTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const toggleTaskStatus = async (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, done: !task.done }
      }
      return task
    })

    setTasks(updatedTasks)
    saveTasks(updatedTasks)
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditingText(task.text);
  };

  const saveEditing = (taskId) => {
    if (!editingText.trim()) {
      setEditingTaskId(null);
      setEditingText('');
      return;
    }

    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, text: editingText } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditingText('');
    saveTasks(updatedTasks);
  };

  return (
    <Box flex={1} p={4} bg="white">
      <VStack space={4} w="100%">
        <Heading size="lg" color="coolGray.800">
          Todo App
        </Heading>

        <HStack space={2}>
          <Input
            flex={1}
            placeholder="Add a new task"
            value={taskInput}
            onChangeText={(text) => setTaskInput(text)}
          />
          <Button onPress={addTask} colorScheme="teal">
            Add
          </Button>
        </HStack>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          extraData={tasks}
          renderItem={({ item }) => (
            <HStack w="100%" justifyContent="space-between" alignItems="center" py={2}>
              <Checkbox
                value={item.id}
                isChecked={item.done}
                onChange={() => toggleTaskStatus(item.id)}
                colorScheme="teal"
                mr={2}
              />
              {editingTaskId === item.id ? (
                <Input
                  flex={1}
                  variant="unstyled"
                  value={editingText}
                  onChangeText={(text) => setEditingText(text)}
                  onBlur={() => saveEditing(item.id)}
                  autoFocus
                />
              ) : (
                <Text
                  flex={1}
                  fontSize="md"
                  onPress={() => startEditing(item)}
                  style={{ textDecorationLine: item.done ? 'line-through' : 'none' }}
                >
                  {item.text}
                </Text>
              )}
              <Button
                onPress={() => deleteTask(item.id)}
                p={1}
                colorScheme="secondary"
                variant='outline'
              >Delete</Button>
            </HStack>
          )}
        />
      </VStack>
    </Box>
  );
}