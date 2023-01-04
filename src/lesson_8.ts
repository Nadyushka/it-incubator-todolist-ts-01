// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).

export function sum(...nums: Array<number>): number {
    // console.log(nums)
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    let result = 0;
    for (let i = 0; i < arguments.length; i++) {
        result = result + arguments[i]
    }
    return result
}


// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number, b: number, c: number): string {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    if (a + b < c || a + c < b || b + c < a) {
        return '00'
    } else {
        if (a === b && b === c) {
            return "10"
        } else {
            if (a === b || a === c || b === c) {
                return "01"
            } else {
                return "11"
            }
        }
    }
}


// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался

    if (number < 10) {
        return number
    } else {
        let res = 0;
        let n = 0;
        while (number > 0) {
            n = number % 10;
            res += n;
            number = (number - n) / 10;
        }
        return res
    }


    //  return number.toString().split('').map(m => +m).reduce((accumulator, currentValue) => accumulator + currentValue)

}


// 4. Функция isEvenIndexSumGreater принимает  параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    let even = 0;
    let odd = 0;
    for (let i = 0; i < arr.length; i++) {
        if (i % 2 == 0 || i === 0) {
            even = even + arr[i]
        } else {
            odd = odd + arr[i]
        }
    }
    return even > odd
}

export const isEvenIndexSumGreater1 = (arr: Array<number>): boolean => {
    const [sumOfEvenElements, sumOfOddElements] = arr.reduce((res, num, index) => {
        res[index % 2] += num;
        return res
    }, [0, 0])
    return sumOfEvenElements > sumOfOddElements
}


// 5. Функция getSquarePositiveIntegers принимает параметром массив чисел и возвращает новый массив. 
// Новый массив состоит из квадратов целых положительных чисел, котрые являются элементами исходгого массива.
// Исходный массив не мутирует.


export function getSquarePositiveIntegers(array: Array<number>): Array<number> {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    let final = []
    for (let i = 0; i < array.length; i++) {
        array[i] > 0 && array[i] === +array[i].toFixed(0) && final.push(array[i] * array[i])
    }
    return final
}

// Number.isInteger(array[i])

// 6. Функция принимает параметром целое не отрицательное число N и возвращает сумму всех чисел от 0 до N включительно
// Попробуйте реализовать функцию без использования перебирающих методов.

export function sumFirstNumbers(N: number): number {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    let final = 0;
    for (let i = 0; i <= N; i++) {
        final = final + i;
    }
    return final
}

// ...и "лапку" вверх!!!!


// Д.З.:
// 7. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено


export function getBanknoteList(amountOfMoney: number): Array<number> {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1]
    let moneyArray = [];
    let restMoney = amountOfMoney

    for (let i = 0; i < banknotes.length; i++) {
        if (restMoney === 0) {
            break
        }
        if (restMoney / banknotes[i] < 1) {
            continue
        }
        moneyArray.push([banknotes[i], Math.floor(restMoney / banknotes[i])])
        restMoney = restMoney - banknotes[i] * Math.floor(restMoney / banknotes[i])
    }

    console.log(moneyArray)

    let finalMoneyArray = []

    for (let i = 0; i < moneyArray.length; i++) {
        for (let t = 0; t < moneyArray[i][1]; t++) {
            finalMoneyArray.push(moneyArray[i][0])
        }
    }

    return finalMoneyArray
}