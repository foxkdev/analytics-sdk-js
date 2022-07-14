export function clone(object: object): object {
    try{
        return JSON.parse(JSON.stringify(object));
    } catch {
        return null;
    }
    
}