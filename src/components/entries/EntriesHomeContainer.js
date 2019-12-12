import React, { useState } from 'react';
import EntryCard from './EntryCard';
import EntryInputNew from './EntryInputNew';

export default function EntriesHomeContainer(props) {
    const [bugArray, setBugArray] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState()
    
    const addNew = (todo) => {
        let newArray = [{ id: bugArray.length, todo: todo }, ...bugArray ]
        setBugArray(newArray)
    };

    const edit = (id) => {
        // console.log('editing parent state' )
        setIsEditing(!isEditing)
        setEditingId(id)
    };
    const cancelEdit = () => {
        setIsEditing(false)
    }

	const updateItem = (todo, index) => {
        let newArray = bugArray
        // handles the reverse array logic of the main display
        newArray[bugArray.length - index - 1] = { id: index, todo: todo }; //new value
        setBugArray(newArray)
        setIsEditing(false)
        setEditingId()
    };
    
    return (
        <div style={{ flex: 1 }}>
            <h3>DOCK IT</h3>
            <h4>Current Bugs</h4>
            <EntryInputNew addNew={addNew} />
            <br />
            {bugArray.map((item) => {
                return <EntryCard key={item.id}
                                item={item}
                                isEditing={isEditing}
                                editingId={editingId} 
                                edit={edit} 
                                updateItem={updateItem}
                                cancelEdit={cancelEdit} />;
            })}
        </div>
    );
}

// class EntriesHomeContainer extends Component {
// 	state = {
//         bugArray: [],
//         isEditing: false,
//         editingId: '',
// 	};

// 	addNew = (todo) => {
// 		const { bugArray } = this.state;
// 		this.setState({
// 			bugArray: [ { id: bugArray.length, todo: todo }, ...bugArray ]
// 		});
//     };

//     edit = (id) => {
//         this.setState({
//             isEditing: true,
//             editingId: id,
//         })
//         console.log('editing parent state', this.state )
//     };
//     cancelEdit = () => {
//         this.setState({
//             isEditing: false,
//         })
//     }

// 	updateItem = (todo, index) => {
//         let bugArray = [ ...this.state.bugArray ]; // create the copy of state array
// 		bugArray[index] = { id: index, todo: todo }; //new value
// 		this.setState({ bugArray: bugArray, isEditing: false, editingId: '' }); //update the value
// 	};

// 	render() {
// 		return (
// 			<div style={{ flex: 1 }}>
// 				<h3>DOCK IT</h3>
// 				<h4>Current Bugs</h4>
// 				<EntryInputNew addNew={this.addNew} />
// 				<br />
// 				{this.state.bugArray.map((item) => {
//                     return <EntryCard key={item.id} 
//                                     item={item} 
//                                     isEditing={this.state.isEditing}
//                                     editingId={this.state.editingId} 
//                                     edit={this.edit} 
//                                     updateItem={this.updateItem}
//                                     cancelEdit={this.cancelEdit} />;
// 				})}
// 			</div>
// 		);
// 	}
// }

// export default EntriesHomeContainer