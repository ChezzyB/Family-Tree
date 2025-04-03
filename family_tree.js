class Person {
    constructor(name, birthDate, details = {}){
        this.name = name;
        this.birthDate = birthDate;
        this.details = details;
        this.children = [];
    }

    addChild(child){
        this.children.push(child);
    }

    updateDetails(newDetails){
        this.details = {...this.details, ...newDetails};
    }
    
    updateName(newName){
        this.name = newName;
    }

    updateBirthdate(newBirthDate){
        this.birthDate = newBirthDate;
    }
}

class familyTree {
    constructor(){
        this.family = new Map();
    }
    
    addMember(name, birthdate, details = {}){
        if (!this.family.has(name)){
            this.family.set(name, new Person(name, birthdate, details));
        }        
    }

    defineParentChild(parentName, childName){
        const parent = this.family.get(parentName);
        const child = this.family.get(childName);
        if (parent && child){
            if (!parent.children.includes(child)){
                parent.addChild(child);
            }
        }
    }


    updateFamilyMember(name, birthdate, details = {}){
        const familyMember = this.family.get(name);
        if (familyMember){
            familyMember.updateDetails(details);
            familyMember.updateName(name);
            familyMember.updateBirthdate(birthdate);
        }        
    }
    
    displayDescendants(name){
        const member = this.family.get(name);
        if (!member) return [];

        let result = [];

        function preorderTraverse(member1){
            if (!member1) return;

            result.push(member1.name);

            let childrenArray = [];
            childrenArray = member1.children;
            childrenArray.forEach(element => {
                preorderTraverse(element);
            });            
        }

        preorderTraverse(member);

        return result;
    }
}

//new family tree created
family = new familyTree();

//adding family members test data
family.addMember("John Doe","January 1st 1980","Male");
family.addMember("Jane Doe","March 15th 1982","Female");
family.addMember("Alex Doe","January 9th 2016","Male");
family.addMember("Emily Doe","March 29th 2018","Female");

//defining parent and child relationships
family.defineParentChild("John Doe","Alex Doe");
family.defineParentChild("John Doe","Emily Doe");
family.defineParentChild("Jane Doe","Alex Doe");
family.defineParentChild("Jane Doe","Emily Doe");

//displaying the family tree descendants of "John Doe"
console.log("________________________________");
console.log("John Doe and their descendants:");
let resultJohn = [];
resultJohn = family.displayDescendants("John Doe");
resultJohn.forEach(element => {console.log(element)});
console.log("________________________________");

//displayingthe family tree descendants of "Jane Doe"
console.log("________________________________");
console.log("Jane Doe and their descendants:");
let resultJane = [];
resultJane = family.displayDescendants("Jane Doe");
resultJane.forEach(element => {console.log(element)});
console.log("________________________________");