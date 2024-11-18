
class Node {
    constructor(current) {
        this.current = current
        this.next = null
    }
}
class LinkedList {
    head = new Node()
    addItem(num) {
        let current = this.head
        while (current.next != null) {
            current = current.next
        }
        current.next = new Node(num)

    }

    print() {
        let current = this.head
        console.log(current)
        while (current.next != null) {
            current = current.next
            console.log(current)
        }
    }

}
function solve(a1, a2) {

    let sum1 = 0, sum2 = 0;
    for (let i = a1.length - 1; i > -1; i--) {
        sum1 *= 10
        sum1 += a1[i]

    }
    for (let i = a2.length - 1; i > -1; i--) {
        sum2 *= 10
        sum2 += a2[i]
    }
    let sum = sum1 + sum2;
    let ans = new LinkedList()

    while (sum > 0) {
        ans.addItem(sum % 10)
        sum = Math.floor(sum / 10)
    }
    return ans;
}
solve([2, 4, 3], [5, 6, 4]).print()