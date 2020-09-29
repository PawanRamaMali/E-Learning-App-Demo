import React from 'react';
import $ from "jquery";

export const randomUser = function() {
    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function(data) {
            console.log(data);
        }
    });
}