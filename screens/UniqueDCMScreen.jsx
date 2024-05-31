import Header from "../components/Header";
import {  useRoute } from "@react-navigation/native";
import { View} from 'react-native';
import { useSelector } from 'react-redux';
import Dcm from "../components/Dcm";

  export default function UniqueDCMScreen() {

    const route = useRoute();
    const { dcm } = route.params;
    const user = useSelector((state) => state.user);
    console.log('DCMMMM', dcm)
    const item = dcm;

    const dcmToRender = 
       
        <Dcm 
          subCategory={item.subCategory && item.subCategory.name}
          author={item.author}
          content={item.content}
          origins={item.origins}
          target={item.target}
          date={item.date}
          likes={item.likes.length}
          dislikes={item.dislikes.length}
          type={item.type}
          isAnonym={item.isAnonym}
          id={item._id}
          isLiked={item.likes.includes(user.userId)}
          isDisliked={item.dislikes.includes(user.userId)}
        />
      ;

    return (
        <>
        <Header showButton={false} />
    
        <View>
{dcmToRender}
    </View>
    </>
    )

}