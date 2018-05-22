export default {
    clearExmpl: {
        populate: '',
        fields: [],
        searchOr: [],
        sort: '',
        countLimit: 10,
        extendQuery: {},
        filePath: ''
    },

    user: {
        populate: '',
        fields: [
            'login',
            'name',
            'surname',
            'lastname',
        ],
        searchOr: [],
        sort: '-createdAt',
        countLimit: 20,
        filePath: 'user'
    },

    userForAdmin: {
        populate: '',
        fields: [
            'login',
            'name',
            'surname',
            'lastName',
        ],
        searchOr: [
            'name',
            'surname',
            'login',
            'email',
            'phone'
        ],
        sort: '-createdAt',
        countLimit: 10,
        filePath: 'user'
    },

    admin: {
        populate: '',
        fields: '',
        searchOr: [],
        sort: '',
        countLimit: 10,
        filePath: 'admin'
    },
};
