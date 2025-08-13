import baseService from '../baseService';

const CLIENTS_TABLE = 'clients';

/**
 * Clients service for managing client-related operations
 */
export const clientsService = {
    /**
     * Fetch clients with optional filtering and pagination
     * @param {Object} options - Fetch options
     * @returns {Promise} Fetched clients
     */
    fetchClients: async (options = {}) => {
        return baseService.fetchWithOptions(CLIENTS_TABLE, {
            ...options,
            orderBy: options.orderBy || 'name',
            ascending: options.ascending ?? true
        });
    },

    /**
     * Create a new client
     * @param {Object} clientData - Client data to create
     * @returns {Promise} Created client
     */
    createClient: async (clientData) => {
        return baseService.create(CLIENTS_TABLE, clientData);
    },

    /**
     * Update an existing client
     * @param {string} clientId - ID of the client to update
     * @param {Object} updateData - Data to update
     * @returns {Promise} Updated client
     */
    updateClient: async (clientId, updateData) => {
        return baseService.update(CLIENTS_TABLE, clientId, updateData);
    },

    /**
     * Delete a client
     * @param {string} clientId - ID of the client to delete
     * @returns {Promise} Deletion result
     */
    deleteClient: async (clientId) => {
        return baseService.delete(CLIENTS_TABLE, clientId);
    },

    /**
     * Get a single client by ID
     * @param {string} clientId - ID of the client to fetch
     * @returns {Promise} Fetched client
     */
    getClientById: async (clientId) => {
        return baseService.getById(CLIENTS_TABLE, clientId);
    }
};

export default clientsService; 