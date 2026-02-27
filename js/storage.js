/**
 * StorageService
 * A simple wrapper for localStorage to handle serialization and error handling.
 */
const StorageService = {
    /**
     * Set an item in localStorage
     * @param {string} key 
     * @param {any} value 
     */
    setItem: function(key, value) {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        } catch (e) {
            console.error('Error saving to localStorage', e);
        }
    },

    /**
     * Get an item from localStorage
     * @param {string} key 
     * @returns {any}
     */
    getItem: function(key) {
        try {
            const serializedValue = localStorage.getItem(key);
            if (serializedValue === null) {
                return null;
            }
            try {
                return JSON.parse(serializedValue);
            } catch (e) {
                // Fallback for non-JSON values (legacy)
                return serializedValue;
            }
        } catch (e) {
            console.error('Error getting from localStorage', e);
            return null;
        }
    },

    /**
     * Remove an item from localStorage
     * @param {string} key 
     */
    removeItem: function(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Error removing from localStorage', e);
        }
    },

    /**
     * Clear all items from localStorage
     */
    clear: function() {
        try {
            localStorage.clear();
        } catch (e) {
            console.error('Error clearing localStorage', e);
        }
    }
};
