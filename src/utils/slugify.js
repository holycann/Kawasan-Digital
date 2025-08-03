export function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w-]+/g, '')        // Remove all non-word chars
        .replace(/--+/g, '-')           // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

export function deslugify(slug) {
    return slug
        .toString()
        .toLowerCase()
        .replace(/-/g, ' ')             // Replace - with spaces
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
}
