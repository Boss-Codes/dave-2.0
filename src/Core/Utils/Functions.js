module.exports = { 
    formatDate: function(date) { 
        return new Intl.DateTimeFormat('en-us').format(date)
    }

}