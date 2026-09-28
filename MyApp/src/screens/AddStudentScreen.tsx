import React, {useState} from 'react';



import {

Alert,

KeyboardAvoidingView,

Platform,

Pressable,

ScrollView,

StyleSheet,

Text,

View,

} from 'react-native';



import {useNavigation} from '@react-navigation/native';



import Header from '../components/Header';

import InputField from '../components/InputField';

import PrimaryButton from '../components/PrimaryButton';



import {Student} from '../types/student';



type Props = {

onAdd: (student: Student) => void;

};



const AddStudentScreen = ({

onAdd,

}: Props) => {



const navigation =

useNavigation<any>();



const [id, setId] = useState('');

const [name, setName] = useState('');

const [dob, setDob] = useState('');

const [gender, setGender] = useState('Nam');

const [email, setEmail] = useState('');

const [phone, setPhone] = useState('');

const [className, setClassName] = useState('');

const [faculty, setFaculty] = useState('');

const [gpa, setGpa] = useState('');



const handleAdd = () => {



if (

!id ||

!name ||

!dob ||

!email ||

!phone ||

!className ||

!faculty ||

!gpa

) {

Alert.alert(

'Thiếu thông tin',

'Vui lòng nhập đầy đủ thông tin.',

);



return;

}



const numberGpa =

Number(gpa.replace(',', '.'));



if (

isNaN(numberGpa) ||

numberGpa < 0 ||

numberGpa > 10

) {

Alert.alert(

'GPA không hợp lệ',

'GPA phải từ 0 đến 10.',

);



return;

}



const student: Student = {

id,

name,

dob,

gender,

email,

phone,

className,

faculty,

gpa: numberGpa,

};



onAdd(student);



Alert.alert(

'Thành công',

'Đã thêm sinh viên.',

[

{

text: 'OK',

onPress: () =>

navigation.goBack(),

},

],

);

};



return (

<View style={styles.container}>



<Header

title="Thêm sinh viên"

subtitle="Nhập thông tin sinh viên mới"

onBack={() =>

navigation.goBack()

}

/>



<KeyboardAvoidingView

style={{flex: 1}}

behavior={

Platform.OS === 'ios'

? 'padding'

: undefined

}>



<ScrollView

contentContainerStyle={

styles.content

}>



<View style={styles.card}>



<Text style={styles.title}>

Thông tin sinh viên

</Text>



<InputField

label="Mã sinh viên *"

value={id}

onChangeText={setId}

placeholder="SV005"

/>



<InputField

label="Họ và tên *"

value={name}

onChangeText={setName}

placeholder="Nguyễn Văn A"

/>



<InputField

label="Ngày sinh *"

value={dob}

onChangeText={setDob}

placeholder="DD/MM/YYYY"

/>



<Text style={styles.label}>

Giới tính

</Text>



<View style={styles.genderRow}>



<Pressable

onPress={() =>

setGender('Nam')

}

style={[

styles.gender,

gender === 'Nam' &&

styles.active,

]}>



<Text

style={[

styles.genderText,

gender === 'Nam' &&

styles.activeText,

]}>



Nam



</Text>



</Pressable>



<Pressable

onPress={() =>

setGender('Nữ')

}

style={[

styles.gender,

gender === 'Nữ' &&

styles.active,

]}>



<Text

style={[

styles.genderText,

gender === 'Nữ' &&

styles.activeText,

]}>



Nữ



</Text>



</Pressable>



</View>



<Text style={styles.section}>

Thông tin học tập

</Text>



<InputField

label="Lớp *"

value={className}

onChangeText={setClassName}

placeholder="CNTT01"

/>



<InputField

label="Khoa *"

value={faculty}

onChangeText={setFaculty}

placeholder="Công nghệ thông tin"

/>



<InputField

label="GPA *"

value={gpa}

onChangeText={setGpa}

placeholder="0 - 10"

keyboardType="numeric"

/>



<Text style={styles.section}>

Thông tin liên hệ

</Text>



<InputField

label="Email *"

value={email}

onChangeText={setEmail}

placeholder="email@gmail.com"

/>



<InputField

label="Số điện thoại *"

value={phone}

onChangeText={setPhone}

placeholder="09xxxxxxxx"

keyboardType="phone-pad"

/>



<PrimaryButton

title="＋ Thêm sinh viên"

onPress={handleAdd}

/>



</View>



</ScrollView>



</KeyboardAvoidingView>



</View>

);

};



export default AddStudentScreen;



const styles = StyleSheet.create({

container: {

flex: 1,

backgroundColor: '#F7F8FC',

},



content: {

padding: 20,

paddingBottom: 40,

},



card: {

backgroundColor: '#FFFFFF',

borderRadius: 22,

padding: 18,

},



title: {

fontSize: 19,

fontWeight: '900',

marginBottom: 16,

color: '#111827',

},



label: {

fontSize: 12,

fontWeight: '800',

marginBottom: 8,

color: '#374151',

},



genderRow: {

flexDirection: 'row',

gap: 10,

},



gender: {

flex: 1,

height: 45,

borderRadius: 12,

borderWidth: 1,

borderColor: '#E5E7EB',

alignItems: 'center',

justifyContent: 'center',

},



active: {

backgroundColor: '#111827',

},



genderText: {

fontWeight: '700',

color: '#6B7280',

},



activeText: {

color: '#FFFFFF',

},



section: {

fontSize: 16,

fontWeight: '900',

marginTop: 20,

marginBottom: 14,

color: '#111827',

},

}); 

