import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";

const styles = StyleSheet.create({
    list: {
        borderWidth: 1,
        borderColor: '#ddd',
        margin: 20,
    },
    listItem: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemText: {
        flexGrow: 1,
        fontSize: 18,
    },
    form: {
        margin: 15,
        flexDirection: 'row',
    },
    input: {
        flexGrow: 1,
        padding: 10,
        backgroundColor: '#ddd',
        fontSize: 18,
    },
})

export default function App() {
    const [subject, setSubject] = useState('');
    const [tasks, setTasks] = useState([
        { id: 1, subject: 'Apple', done: false },
        { id: 2, subject: 'Orange', done: false },
        { id: 3, subject: 'Mango', done: false },
        { id: 4, subject: 'Banana', done: false },
    ]);
    const add = () => {
        const id = (tasks.length > 0) ? tasks[tasks.length - 1].id + 1 : 1;
        setTasks([...tasks, { id, subject, done: false }]);
        setSubject('');
    }
    return (
        <View>
            <View style={styles.form}>
                <TextInput style={styles.input} value={subject} onChangeText={setSubject} />
                <Button title="Add" onPress={add} />
            </View>
            <View style={styles.list}>
                {tasks.map(item => (
                    <View style={styles.listItem} key={item.id}>
                        <Text style={styles.itemText}>{item.subject}</Text>
                        <Link href="/edit" style={{ marginRight: 10 }} >
                            <FontAwesome name="edit" style={{ fontSize: 18, color: "teal" }} />
                        </Link>
                        <TouchableOpacity onPress={() => {
                            setTasks(tasks.filter(x => {
                                return x.id != item.id;
                            }))
                        }}>
                            <FontAwesome name="trash" style={{ fontSize: 18, color: "salmon" }} />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
}