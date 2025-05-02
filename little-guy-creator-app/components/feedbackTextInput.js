import { View, Text, TextInput } from 'react-native';
import {styles} from '../styles.js';

// Text input field with feedback text (e.g. for following constraints)
const FeedbackTextInput = (props) => {
    return (
        <View>
            <Text>{props.title}:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={props.onChangeText}
                    editable={props.editable}
                    placeholder={props.placeholder}
                    secureTextEntry={props.secureTextEntry}
                />
            <Text style={styles.errorText}>{props.feedback}</Text>
        </View>
    );
}

export default FeedbackTextInput