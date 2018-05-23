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
            'documents',
            'isVerify'
        ],
        searchOr: [],
        sort: '-updatedAt',
        extendQuery: {
            isAdmin: false,
            isVerify: false,
            'documents.status': {
                $in: [
                    'send'
                ]
            }
        },
        countLimit: 10,
        filePath: 'user'
    },
};
