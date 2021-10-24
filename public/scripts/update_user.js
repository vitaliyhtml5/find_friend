'use strict';

// Update data of friend
import {showDropdown} from './dropdown_names.js';


function updateFriend() {
    document.querySelector('.change-name-friend').innerHTML = `<ul class="list-name"><li class="header-list-name">Choose a friend</li></ul><i class="material-icons">expand_more</i></div>`;
    showDropdown('editFriend');
}


export {updateFriend}