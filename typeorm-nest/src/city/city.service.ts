import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class CityService {
  @InjectRepository(City) private readonly cityRepository: Repository<City>;

  @InjectEntityManager() private readonly entityManager: EntityManager;

  create(createCityDto: CreateCityDto) {
    return 'This action adds a new city' + JSON.stringify(createCityDto);
  }

  async findAll() {
    // const city = new City();
    // city.name = '华北';
    // await this.cityRepository.save(city);

    // const cityChild = new City();
    // cityChild.name = '山东';
    // const parent = await this.cityRepository.findOne({
    //   where: { name: '华北' },
    // });

    // if (parent) {
    //   cityChild.parent = parent;
    // }
    // await this.cityRepository.save(cityChild);

    // const city = new City();
    // city.name = '华南';
    // await this.entityManager.save(city);

    // const cityChild1 = new City();
    // cityChild1.name = '云南';
    // const parent = await this.entityManager.findOne(City, {
    //   where: {
    //     name: '华南',
    //   },
    // });
    // if (parent) {
    //   cityChild1.parent = parent;
    // }
    // await this.entityManager.save(City, cityChild1);

    // const cityChild2 = new City();
    // cityChild2.name = '昆明';

    // const parent2 = await this.entityManager.findOne(City, {
    //   where: {
    //     name: '云南',
    //   },
    // });
    // if (parent) {
    //   cityChild2.parent = parent2;
    // }
    // await this.entityManager.save(City, cityChild2);

    // return this.cityRepository.find(); // 返回的是扁平结构
    // return this.entityManager.getTreeRepository(City).findTrees();

    // 只查询根节点
    // return this.entityManager.getTreeRepository(City).findRoots();

    const parent = await this.entityManager.findOne(City, {
      where: {
        name: '云南',
      },
    });

    // 查询某个节点的所有后代节点
    // return this.entityManager
    //   .getTreeRepository(City)
    //   .findDescendantsTree(parent);

    // 查询某个节点的所有祖先节点
    return this.entityManager.getTreeRepository(City).findAncestorsTree(parent);

    // 查询某个节点的所有祖先节点 扁平化结构
    // return this.entityManager.getTreeRepository(City).findAncestors(parent);

    // 查询某个节点的后代节点数量(含自己)
    // return this.entityManager.getTreeRepository(City).countDescendants(parent); // 2
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    console.log('updateCityDto: ', updateCityDto);
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
