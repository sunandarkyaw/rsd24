import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
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
    const [tasks, setTasks] = useState([]);
    const api = "http://192.168.220.124:8888/tasks";

    useEffect(() => {
        (async () => {
            const res = await fetch(api);
            const data = await res.json();

            setTasks(data);
        })();
    }, [])

    const add = async () => {
        const res = await fetch(api, {
            method: 'POST',
            body: JSON.stringify({ subject }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await res.json();
        setTasks([...tasks, data]);
        setSubject('');
    }

    // const toggle = async _id => {
    //     await fetch(`${api}/toggle/${_id}`, {
    //         method: 'PUT',
    //         body: JSON.stringify({ subject }),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     });
    // }

    return (
        <View>
            <View style={styles.form}>
                <TextInput style={styles.input} value={subject} onChangeText={setSubject} />
                <Button title="Add" onPress={add} />
            </View>
            <View style={styles.list}>
                {tasks.map(item => (
                    <View style={styles.listItem} key={item._id}>
                        <Text style={styles.itemText}>{item.subject}</Text>
                        <Link href={`/edit/${item._id}`} style={{ marginRight: 10 }} >
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