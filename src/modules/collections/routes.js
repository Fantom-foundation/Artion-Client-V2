import Collection from '@/modules/collections/views/Collection/Collection.vue';
import CollectionCreate from '@/modules/collections/views/CollectionCreate/CollectionCreate.vue';
import CollectionRegister from '@/modules/collections/views/CollectionRegister/CollectionRegister.vue';

export function getCollectionsRoutes() {
    return [
        {
            path: '/collection',
            name: 'collection',
            component: Collection,
            children: [
                {
                    path: 'create',
                    name: 'collection-create',
                    component: CollectionCreate,
                },
                {
                    path: 'register',
                    name: 'collection-register',
                    component: CollectionRegister,
                },
            ],
        },
    ];
}
