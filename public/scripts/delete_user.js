'use strict';

// Update data of friend
import {showDropdown} from './dropdown_names.js';

function deleteFriend() {
    if (document.querySelector('.list-name')) {
        document.querySelector('.list-name').remove();
    }
    document.querySelector('.delete-name-friend').innerHTML = `<ul class="list-name"><li class="header-list-name">Choose a friend</li></ul><i class="material-icons">expand_more</i></div>`;
    showDropdown('deleteFriend');
}

export {deleteFriend}