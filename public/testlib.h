#ifndef _TESTLIB_H_
#define _TESTLIB_H_

#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include <deque>
#include <set>
#include <map>
#include <algorithm>
#include <cstdlib>
#include <cstdio>
#include <cctype>
#include <cmath>
#include <cstring>
#include <cassert>
#include <climits>
#include <ctime>

using namespace std;

class random_t {
private:
    unsigned long long seed;
    
public:
    random_t() : seed(3905348978240129619LL) {}
    random_t(int s) : seed(s) {}
    
    void setSeed(int s) {
        seed = s;
    }
    
    unsigned long long nextBits(int bits) {
        seed = seed * 0x5DEECE66DLL + 0xBLL;
        seed &= (1LL << 48) - 1;
        return seed >> (48 - bits);
    }
    
    int next() {
        return (int)nextBits(31);
    }
    
    int next(int n) {
        if (n <= 0) return 0;
        return next() % n;
    }
    
    int next(int from, int to) {
        if (from > to) swap(from, to);
        return next(to - from + 1) + from;
    }
    
    long long next(long long from, long long to) {
        if (from > to) swap(from, to);
        return next((int)(to - from + 1)) + from;
    }
    
    double next(double from, double to) {
        if (from > to) swap(from, to);
        return from + (to - from) * (next() / (double)INT_MAX);
    }
    
    int wnext(int n, int w) {
        if (w <= 0) return next(n);
        int result = 0;
        for (int i = 0; i < w; i++) {
            result = max(result, next(n));
        }
        return result;
    }
};

random_t rnd;

void registerGen(int argc, char* argv[], int version) {
    if (argc > 1) {
        rnd.setSeed(atoi(argv[1]));
    } else {
        rnd.setSeed(time(NULL));
    }
}

#endif