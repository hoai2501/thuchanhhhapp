import React from 'react';

import {

Alert,

Pressable,

ScrollView,

StyleSheet,

Text,

View,

} from 'react-native';

import {useNavigation} from '@react-navigation/native';



import Header from '../components/Header';

import InfoRow from '../components/InfoRow';

import {Student} from '../types/student';

import {getRank} from '../utils/studentUtils';



type Props = {

student: Student;

onDelete?: (id: string) => void;

};



const StudentDetailScreen = ({student, onDelete}: Props) => {

const navigation = useNavigation<any>();

const rank = getRank(student.gpa);



const handleDelete = () => {

Alert.alert(

'Xóa sinh viên',

`Bạn có chắc muốn xóa ${student.name}?`,

[

{

text: 'Hủy',

style: 'cancel',

},

{

text: 'Xóa',

style: 'destructive',

onPress: () => {

onDelete?.(student.id);

navigation.goBack();

},

},

],

);

};



return (

<View style={styles.container}>

<Header

title="Chi tiết sinh viên"

onBack={() => navigation.goBack()}

/>



<ScrollView

contentContainerStyle={styles.content}

showsVerticalScrollIndicator={false}>

<View style={styles.profile}>

<View style={styles.avatar}>

<Text style={styles.avatarText}>

{student.name.charAt(0)}

</Text>

</View>



<Text style={styles.name}>{student.name}</Text>

<Text style={styles.id}>{student.id}</Text>



<View

style={[

styles.rank,

{backgroundColor: rank.background},

]}>

<Text

style={[

styles.rankText,

{color: rank.color},

]}>

{rank.name} • GPA {student.gpa.toFixed(1)}

</Text>

</View>

</View>



<View style={styles.infoCard}>

<Text style={styles.infoTitle}>

Thông tin sinh viên

</Text>



<InfoRow label="Ngày sinh" value={student.dob} />

<InfoRow label="Giới tính" value={student.gender} />

<InfoRow label="Email" value={student.email} />

<InfoRow label="Số điện thoại" value={student.phone} />

<InfoRow label="Lớp" value={student.className} />

<InfoRow label="Khoa" value={student.faculty} />

</View>



<View style={styles.actions}>

<Pressable

style={({pressed}) => [

styles.edit,

pressed && styles.buttonPressed,

]}

onPress={() =>

navigation.navigate('EditStudent', {

student,

})

}>

<Text style={styles.editText}>✎ Chỉnh sửa</Text>

</Pressable>



<Pressable

style={({pressed}) => [

styles.delete,

pressed && styles.buttonPressed,

]}

onPress={handleDelete}>

<Text style={styles.deleteText}>Xóa</Text>

</Pressable>

</View>

</ScrollView>

</View>

);

};



export default StudentDetailScreen;



const styles = StyleSheet.create({

container: {

flex: 1,

backgroundColor: '#F7F8FC',

},

content: {

padding: 20,

paddingBottom: 40,

},

profile: {

backgroundColor: '#FFFFFF',

borderRadius: 24,

alignItems: 'center',

padding: 25,

},

avatar: {

width: 82,

height: 82,

borderRadius: 28,

backgroundColor: '#111827',

alignItems: 'center',

justifyContent: 'center',

},

avatarText: {

fontSize: 34,

color: '#FFFFFF',

fontWeight: '900',

},

name: {

fontSize: 22,

fontWeight: '900',

color: '#111827',

marginTop: 13,

},

id: {

color: '#6B7280',

marginTop: 4,

},

rank: {

marginTop: 12,

paddingHorizontal: 13,

paddingVertical: 8,

borderRadius: 12,

},

rankText: {

fontWeight: '800',

},

infoCard: {

backgroundColor: '#FFFFFF',

borderRadius: 20,

padding: 18,

marginTop: 14,

},

infoTitle: {

fontSize: 17,

fontWeight: '900',

color: '#111827',

marginBottom: 8,

},

actions: {

flexDirection: 'row',

gap: 10,

marginTop: 15,

},

edit: {

flex: 1,

height: 52,

borderRadius: 15,

backgroundColor: '#111827',

alignItems: 'center',

justifyContent: 'center',

},

editText: {

color: '#FFFFFF',

fontWeight: '800',

},

delete: {

width: 90,

height: 52,

borderRadius: 15,

backgroundColor: '#FEE2E2',

alignItems: 'center',

justifyContent: 'center',

},

deleteText: {

color: '#DC2626',

fontWeight: '800',

},

buttonPressed: {

opacity: 0.65,

transform: [{scale: 0.98}],

},

});