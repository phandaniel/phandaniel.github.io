const fs = require('fs');

// This requires 'glob', let's just do a simple walk
const walk = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.html')) {
            results.push(file);
        }
    });
    return results;
};

const files = walk('release');
files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    if (content.includes('\\n')) {
        content = content.replace(/\\n/g, '\n');
        fs.writeFileSync(f, content);
    }
});
console.log('Fixed \\n');
